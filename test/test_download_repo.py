import pytest

from api import data_pipeline


def test_build_clone_url_encodes_special_characters():
    repo_url = "https://github.com/example/repo"
    token = "abc:@/ token"

    clone_url = data_pipeline._build_clone_url(repo_url, "github", token)

    assert clone_url == "https://abc%3A%40%2F%20token@github.com/example/repo"


def test_build_clone_url_codeberg_with_username(monkeypatch):
    repo_url = "https://codeberg.org/user/private-repo"

    def fake_get_username(access_token: str):
        assert access_token == "secret"
        return "codeberg-user"

    monkeypatch.setattr(data_pipeline, "get_codeberg_username", fake_get_username)

    clone_url = data_pipeline._build_clone_url(repo_url, "codeberg", "secret")

    assert clone_url == "https://codeberg-user:secret@codeberg.org/user/private-repo"


def test_build_clone_url_codeberg_without_username(monkeypatch):
    repo_url = "https://codeberg.org/user/private-repo"

    def fake_get_username(access_token: str):
        return None

    monkeypatch.setattr(data_pipeline, "get_codeberg_username", fake_get_username)

    clone_url = data_pipeline._build_clone_url(repo_url, "codeberg", "secret")

    assert clone_url == "https://user:secret@codeberg.org/user/private-repo"
