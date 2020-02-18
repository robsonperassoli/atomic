defmodule AtomicWeb.Resolvers.Helpers do

  def create_error(%Ecto.Changeset{} = changeset, message) do
    {:error, message: message, details: extract_details(changeset)}
  end

  def extract_details(%Ecto.Changeset{} = changeset) do
    changeset
    |> Ecto.Changeset.traverse_errors(fn {msg, _} -> msg end)
  end
end
