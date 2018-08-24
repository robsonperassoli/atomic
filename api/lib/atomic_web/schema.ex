defmodule AtomicWeb.Schema do
  use Absinthe.Schema
  use Absinthe.Ecto, repo: Atomic.Repo


  alias AtomicWeb.ProjectManagementResolver
  alias AtomicWeb.AccountsResolver

  import_types Absinthe.Type.Custom

  enum :task_status, values: [:running, :stopped]

  object :project do
    field :id, non_null(:id)
    field :name, non_null(:string)
    field :tasks, list_of(:task), resolve: assoc(:tasks)
  end

  object :task do
    field :id, non_null(:id)
    field :description, non_null(:string)
    field :timer_started_at, :datetime
    field :timer_stopped_at, :datetime
    field :timer_status, :task_status
    field :time, :time
    field :tags, list_of(:string)
  end

  object :user do
    field :name, non_null(:string)
    field :email, non_null(:string)
  end

  object :session do
    field :token, non_null(:string)
  end

  query do
    field :projects, non_null(list_of(non_null(:project))) do
      resolve &ProjectManagementResolver.list_projects/3
    end
  end

  mutation do
    field :create_project, :project do
      arg :name, non_null(:string)

      resolve &ProjectManagementResolver.create_project/3
    end

    field :update_project, :project do
      arg :id, non_null(:id)
      arg :name, non_null(:string)

      resolve &ProjectManagementResolver.update_project/3
    end

    field :create_task, :task do
      arg :project_id, non_null(:id)
      arg :description, non_null(:string)

      resolve &ProjectManagementResolver.create_task/3
    end

    field :register_user, :user do
      arg :name, non_null(:string)
      arg :email, non_null(:string)
      arg :password, non_null(:string)

      resolve &AccountsResolver.register_user/3
    end

    field :login, :session do
      arg :email, non_null(:string)
      arg :password, non_null(:string)

      resolve &AccountsResolver.login/3
    end
  end
end