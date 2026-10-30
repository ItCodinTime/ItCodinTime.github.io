"""Local portfolio preview. Always serve the current workspace files."""

from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class PreviewHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


if __name__ == "__main__":
    root = Path(__file__).resolve().parent
    handler = partial(PreviewHandler, directory=str(root))
    server = ThreadingHTTPServer(("127.0.0.1", 8000), handler)
    print(f"Portfolio preview: http://localhost:8000/?v=social4\nServing {root}", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
