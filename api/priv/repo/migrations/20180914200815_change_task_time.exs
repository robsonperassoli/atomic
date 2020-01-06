defmodule Atomic.Repo.Migrations.ChangeTaskTime do
  use Ecto.Migration

  def change do
    alter table(:tasks) do
      remove :time
      add :time, :integer, [null: false, default: 0]
    end
  end
end
