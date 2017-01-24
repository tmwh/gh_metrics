class LoadEventsShcedulerService
  include Sidekiq::Worker

  def perform(token, username)
    LoadEventsFromGithubService.new(token, username).perform
  end
end
