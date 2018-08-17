defmodule AtomicWeb.AccountsResolver do
  alias Atomic.Accounts

  def register_user(_root, args, _info) do
    case Accounts.create_user(args) do
      {:ok, user} ->
        {:ok, user}
      {:error, _reason} ->
        {:error, "Error registering user"}
    end
  end
end