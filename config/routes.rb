# frozen_string_literal: true
Rails.application.routes.draw do
  root to: 'metrics#index'

  get 'sign_in', to: 'metrics#sign_in'
end
