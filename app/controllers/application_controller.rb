class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :user_signed_in?, :current_user

  private

  def check_user_login
    unless user_signed_in?
      flash[:notice] = 'Please login first!'
      redirect_to_login
      reset_session
    end
  end

  def reset_session
    session[:user_github_id] = ''
    session[:token] = ''
  end

  def user_signed_in?
    session[:token].present?
  end

  def current_user
    return @_current_user if defined?(@_current_user)
    return unless user_signed_in?
    @_current_user = User.find_by(github_id: session[:user_github_id])
  end

  def redirect_to_login
    redirect_to login_path
  end

  protected

  def load_repositories
    @_load_repositories ||= current_user.repositories.map(&:name)
  end

  def load_events
    @_load_events ||= LoadEventsService.new(
      params[:repository], params[:date_range], load_repositories.first
    ).perform
  end
end
