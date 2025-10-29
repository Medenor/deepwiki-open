import types
import sys

import pytest


if 'tiktoken' not in sys.modules:
    dummy_tiktoken = types.ModuleType("tiktoken")

    class _DummyEncoding:
        def encode(self, text):
            return [0] * max(len(text), 1)

    def _dummy_encoding(*args, **kwargs):
        return _DummyEncoding()

    dummy_tiktoken.get_encoding = _dummy_encoding  # type: ignore[attr-defined]
    dummy_tiktoken.encoding_for_model = _dummy_encoding  # type: ignore[attr-defined]
    sys.modules['tiktoken'] = dummy_tiktoken

from api import data_pipeline


def test_build_clone_url_encodes_special_characters():
    repo_url = "https://github.com/example/repo"
    token = "abc:@/ token"

    clone_url = data_pipeline._build_clone_url(repo_url, "github", token)

    assert clone_url == "https://abc%3A%40%2F%20token@github.com/example/repo"
def test_build_clone_url_rejects_codeberg_tokens():
    repo_url = "https://codeberg.org/user/private-repo"

    with pytest.raises(ValueError, match="Codeberg private repositories are not supported"):
        data_pipeline._build_clone_url(repo_url, "codeberg", "secret")


def test_get_codeberg_file_content_rejects_tokens():
    repo_url = "https://codeberg.org/user/repo"

    with pytest.raises(ValueError, match="Codeberg private repositories are not supported"):
        data_pipeline.get_codeberg_file_content(repo_url, "README.md", access_token="secret")
