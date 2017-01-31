class AuthenticationController < ApplicationController
  before_action :validate_token, only: :create

  def index
    reset_session if user_signed_in?
  end

  def create
    session[:token] = params[:user][:token]
    session[:user_github_id] = load_user.id
    GithubActions::ImportRepositoriesService.new(load_user, session[:token]).perform
    LoadEventsJob.perform_later(session[:token], load_user)
    redirect_to root_path
  end

  def destroy
    reset_session
    redirect_to_login
  end

  private

  def validate_token
    unless GithubActions::ValidateTokenService.new(params.require(:user)[:token]).perform
      login_error(t('sessions.invalid_token'))
    end
  rescue Faraday::ConnectionFailed
    login_error(t('errors.messages.network_error'))
  end

  def login_error(message)
    flash[:notice] = message
    redirect_to_login
  end

  def load_user
    @_load_user ||= GithubActions::LoadUserService.new(params[:user][:token]).perform
  end
end
