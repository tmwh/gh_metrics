module GithubActions
  class LoadUserService
    def initialize(token)
      @token = token
      @user = github.users.get
    end

    def perform
      load_or_create_user
    end

    private

    attr_reader :user

    def load_or_create_user
      record = User.find_or_initialize_by(github_id: user.id)
      record.update!(user_attributes)
      record
    end

    def user_attributes
      {
        name: user.login,
        avatar_url: user.avatar_url
      }
    end

    def github
      @_github ||= Github.new oauth_token: @token
    end
  end
end
