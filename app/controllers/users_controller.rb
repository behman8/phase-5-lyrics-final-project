class UsersController < ApplicationController

    def show
        user = User.find_by(id: session[:user_id])
        if user
            render json: user, status: :ok
        else
            render json: { errors: "Not authorized."}, status: :unauthorized
        end
    end

    def create
        user = User.new(user_params)
        if user.save
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def user_params
        params.require(:user).permit(:username, :password)
    end

end
