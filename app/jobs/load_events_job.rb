class LoadEventsJob < ApplicationJob
  queue_as :default

  def perform(token, username)
    GithubActions::LoadEventsService.new(token, username).perform
  end
end
