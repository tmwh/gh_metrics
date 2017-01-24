class AuthenticationController < ApplicationController
  def index
    if login?
      reset_session
    end
  end

  def create
    login_or_create_user
    session[:username] = params[:user][:name]
    session[:token] = params[:user][:token]
    LoadEventsShcedulerService.perform_async(session[:token], session[:username])
    redirect_to root_path
  end

  def login_or_create_user
    if User.find_by_github_name(params[:user][:name]).nil?
      User.create!(github_name: params[:user][:name])
    end
  end

  def destroy
    reset_session
    redirect_to_login
  end
end
