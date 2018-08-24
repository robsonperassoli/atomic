defmodule Atomic.ProjectManagement.Project do
  use Ecto.Schema
  import Ecto.Changeset

  schema "projects" do
    field :name, :string
    belongs_to :user, Atomic.Accounts.User
    has_many :tasks, Atomic.ProjectManagement.Task

    timestamps()
  end

  @doc false
  def changeset(project, attrs) do
    project
    |> cast(attrs, [:name, :user_id])
    |> validate_required([:name, :user_id])
  end
end
