class GithubApiService

  def perform
    github = Github.new oauth_token: ENV.fetch('GITHUB_TOKEN')
    puts github.scopes.list
  end

  def event

  end
end
