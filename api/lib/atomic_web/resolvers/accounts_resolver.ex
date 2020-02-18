defmodule AtomicWeb.AccountsResolver do
  alias Atomic.Accounts
  alias AtomicWeb.AuthHelper
  import AtomicWeb.Resolvers.Helpers

  def register_user(_root, args, _info) do
    case Accounts.create_user(args) do
      {:ok, user} ->
        {:ok, user}
      {:error, changeset} -> create_error(changeset, "Error registering user")
    end
  end

  def login(_root, %{email: email, password: password}, _info) do
    with {:ok, user} <- AuthHelper.login_with_email_and_pass(email, password),
         {:ok, jwt, _} <- Atomic.Guardian.encode_and_sign(user) do
      {:ok, %{token: jwt}}
    end
  end

  def me(_root, _args, %{context: %{current_user: user}}) do
    {:ok, user}
  end

  def me(_root, _args, _info), do: {:error, "Authentication Required"}
end
