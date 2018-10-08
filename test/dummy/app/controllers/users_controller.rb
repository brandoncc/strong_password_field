class UsersController < ApplicationController
  before_action :set_user, only: [:edit]

  def index
    @users = User.all
  end

  def edit
  end

  def new
    @user = User.new
  end

  private
  def set_user
    @user = User.find_by(id: params[:id])
  end
end
