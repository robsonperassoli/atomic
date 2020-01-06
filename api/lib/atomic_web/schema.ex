defmodule AtomicWeb.Schema do

  use Absinthe.Schema

  query do
    field :hello, :string do
      arg :name, non_null(:string)
      resolve fn %{name: name}, _ ->
        {:ok, "Hello #{name}"}
      end
    end
  end
end
