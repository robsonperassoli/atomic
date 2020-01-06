defmodule Atomic.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :description, :string
      add :timer_started_at, :utc_datetime
      add :timer_stopped_at, :utc_datetime
      add :timer_status, :string
      add :time, :time
      add :tags, {:array, :string}
      add :project_id, references(:projects), [null: false]

      timestamps()
    end
  end
end
