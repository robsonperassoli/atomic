defmodule AtomicWeb.AuthHelper do
  @moduledoc false

  import Comeonin.Bcrypt, only: [checkpw: 2]
  alias Atomic.Accounts

  def login_with_email_and_pass(email, given_pass) do
    user = Accounts.get_user_by_email(email)
    cond do
      user && checkpw(given_pass, user.password_hash) -> 
        {:ok, user}
      user ->
        {:error, "Incorrect login credentials"}
      true -> 
        {:error, "User not found"}
    end
  end
end