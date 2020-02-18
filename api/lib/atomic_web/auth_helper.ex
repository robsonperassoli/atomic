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

  def user_from_token({:ok, claims}) do
    user = String.to_integer(claims["sub"])
    |> Accounts.get_user!()

    {:ok, user}
  end

  def user_from_token({:error, :token_expired}), do: {:error, "Token expired"}
  def user_from_token({:error, _error}), do: {:error, "Unknown error verifying token"}

  def get_user_by_token(token) do
    token
    |> Guardian.decode_and_verify()
    |> user_from_token()
  end
end
