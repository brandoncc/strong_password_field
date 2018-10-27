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

  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to action: :index
    else
      render action: :new
    end
  end

  private
  def set_user
    @user = User.find_by(id: params[:id])
  end

  def user_params
    params.require(:user).permit(:username, :password, :email)
  end
end
