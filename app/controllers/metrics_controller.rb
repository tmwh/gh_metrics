class MetricsController < ApplicationController
  before_action :check_user_login
  rescue_from Github::Error::NotFound || Github::Error::Unauthorized, with: :redirect_to_login

  def index
    @repositories = Github.new(oauth_token: session[:token]).repos.list.reduce([]) do |arr, repo|
      arr << repo.name
    end
    @events = Event.all
    @labels = LabelsCarrier.new(@events)
  end
end
