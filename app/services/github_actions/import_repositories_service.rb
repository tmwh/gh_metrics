module GithubActions
  class ImportRepositoriesService
    def initialize(user, token)
      @user = user
      @token = token
    end

    def perform
      Github.new(oauth_token: token).repos.list do |repository|
        record = Repository.find_or_initialize_by(github_id: repository.id)
        record.update!(attributes_for(repository))
        user.repositories << record
      end
    end

    private

    attr_reader :user, :token

    def attributes_for(repository)
      { name: repository.name }
    end
  end
end
