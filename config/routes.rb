# frozen_string_literal: true
Rails.application.routes.draw do
  root to: 'metrics#index'

  get 'login', to: 'authentication#index'
  post 'login', to: 'authentication#create'
  get 'logout', to: 'authentication#destroy'
  post 'logout', to: 'authentication#destroy'
end
