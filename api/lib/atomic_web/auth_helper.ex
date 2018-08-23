defmodule AtomicWeb.AuthHelper do
  @moduledoc false

  import Comeonin.Bcrypt, only: [checkpw: 2]
  alias Atomic.Accounts
  alias Atomic.Guardian

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

  def get_user_by_token(token) do
    {:ok, claims} = Guardian.decode_and_verify(token)
    user = Accounts.get_user!(String.to_integer(claims["sub"]))
    {:ok, user}
  end
end