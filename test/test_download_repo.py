import pytest

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
