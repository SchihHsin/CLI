"""
自动监听文件变动并推送到 GitHub。
运行方式: python sync_watch.py
"""
import subprocess, time, sys
from pathlib import Path
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

REPO_DIR = Path(__file__).parent
DEBOUNCE = 5  # 秒，防止连续触发多次提交


class SyncHandler(FileSystemEventHandler):
    def __init__(self):
        self._pending = False
        self._last = 0

    def on_any_event(self, event):
        if event.is_directory:
            return
        src = event.src_path
        # 忽略 git 内部文件和自身
        if "/.git/" in src.replace("\\", "/") or src.endswith("sync_watch.py"):
            return
        self._last = time.time()
        if not self._pending:
            self._pending = True

    def flush_if_ready(self):
        if self._pending and (time.time() - self._last) >= DEBOUNCE:
            self._pending = False
            sync()


def run(cmd):
    return subprocess.run(cmd, cwd=REPO_DIR, capture_output=True, text=True, encoding="utf-8")


def sync():
    status = run(["git", "status", "--porcelain"])
    if not status.stdout.strip():
        return  # 无变动

    changed_files = [l[3:].strip() for l in status.stdout.splitlines()]
    # 生成描述：列出变动文件
    desc = "更新: " + ", ".join(changed_files[:5])
    if len(changed_files) > 5:
        desc += f" 等 {len(changed_files)} 个文件"

    run(["git", "add", "."])
    run(["git", "commit", "-m", desc])
    result = run(["git", "push"])

    if result.returncode == 0:
        print(f"[{time.strftime('%H:%M:%S')}] 已推送 — {desc}")
    else:
        print(f"[{time.strftime('%H:%M:%S')}] 推送失败: {result.stderr.strip()}")


if __name__ == "__main__":
    print(f"监听目录: {REPO_DIR}")
    print("文件变动将在 5 秒静默后自动提交并推送到 GitHub，Ctrl+C 退出。\n")

    handler = SyncHandler()
    observer = Observer()
    observer.schedule(handler, str(REPO_DIR), recursive=True)
    observer.start()

    try:
        while True:
            handler.flush_if_ready()
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
        print("\n已停止监听。")
    observer.join()
