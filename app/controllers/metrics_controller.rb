class MetricsController < ApplicationController
  def index
    @repositories = GithubApiService.new.perform
  end
end
