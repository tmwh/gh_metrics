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
    session[:username] = ''
    session[:token] = ''
  end

  def user_signed_in?
    session[:username].present? && session[:token].present?
  end

  def current_user
    return @_current_user if defined?(@_current_user)
    return unless user_signed_in?
    @_current_user = User.find_by(github_name: session[:username])
  end

  def redirect_to_login
    redirect_to login_path
  end
end
