module GithubActions
  class ImportRepositoriesService
    def initialize(user, token)
      @user = user
      @token = token
    end

    def perform
      Github.new(oauth_token: token).repos.list do |repository|
        unless Repository.find_by(id: repository.id).present?
          record = Repository.create!(github_id: repository.id, name: repository.name)
          user.repositories << record
        end
      end
    end

    private

    attr_reader :user, :token
  end
end
