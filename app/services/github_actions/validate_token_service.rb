# frozen_string_literal: true
module GithubActions
  class ValidateTokenService
    def initialize(token)
      @token = token
    end

    def perform
      Github.new(oauth_token: token).users.get
    rescue Github::Error::Unauthorized
      false
    end

    private

    attr_reader :token
  end
end
