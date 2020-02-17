defmodule Atomic.Factory do
  alias Atomic.Accounts

  def uint do
    System.unique_integer([:positive])
  end

  def create_user(attrs \\ %{}) do
    default_user = %{
      name: "User #{uint()}",
      email: "email-#{uint()}@test.com",
      password: "secret"
    }

    attrs
    |> Enum.into(default_user)
    |> Accounts.create_user()
  end

end
