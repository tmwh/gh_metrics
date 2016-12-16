# frozen_string_literal: true
class GithubApiService
  def perform
    github.repos.all
  end

  private

  def github
    @_github ||= Github.new oauth_token: ENV.fetch('GITHUB_TOKEN')
  end
end
