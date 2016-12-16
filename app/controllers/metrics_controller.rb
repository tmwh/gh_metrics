class MetricsController < ApplicationController
  def index
    @repositories = GithubApiService.new.perform
  end

  def sign_in
    @user = ''
  end
end
