class LoadEventsJob < ApplicationJob
  queue_as :default

  def perform(token, username)
    LoadEventsFromGithubService.new(token, username).perform
  end
end
