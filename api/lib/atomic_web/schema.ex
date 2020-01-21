defmodule AtomicWeb.Schema do
  use Absinthe.Schema

  alias AtomicWeb.ProjectManagementResolver
  alias AtomicWeb.AccountsResolver
  alias AtomicWeb.ReportsResolver

  import_types Absinthe.Type.Custom

  enum :task_status, values: [:running, :stopped]

  object :project do
    field :id, non_null(:id)
    field :name, non_null(:string)
    field :tasks, list_of(:task) do
      arg :created_at_start, :datetime
      arg :created_at_end, :datetime
      resolve &ProjectManagementResolver.list_tasks/3
    end
  end

  object :task do
    field :id, non_null(:id)
    field :description, non_null(:string)
    field :timer_started_at, :datetime
    field :timer_stopped_at, :datetime
    field :timer_status, :string
    field :time, :integer
    field :tags, list_of(:string)
  end

  object :user do
    field :name, non_null(:string)
    field :email, non_null(:string)
  end

  object :session do
    field :token, non_null(:string)
  end

  object :report do
    field :id, non_null(:id)
    field :title, non_null(:string)
    field :url, non_null(:string)
  end

  query do
    field :projects, non_null(list_of(non_null(:project))) do
      middleware AtomicWeb.AuthMiddleware
      resolve &ProjectManagementResolver.list_projects/3
    end

    field :me, non_null(:user) do
      middleware AtomicWeb.AuthMiddleware
      resolve &AccountsResolver.me/3
    end

    field :project, non_null(:project) do
      arg :id, non_null(:id)

      middleware AtomicWeb.AuthMiddleware
      resolve &ProjectManagementResolver.get_project/3
    end
  end

  mutation do
    field :create_project, :project do
      arg :name, non_null(:string)

      middleware AtomicWeb.AuthMiddleware
      resolve &ProjectManagementResolver.create_project/3
    end

    field :update_project, :project do
      arg :id, non_null(:id)
      arg :name, non_null(:string)

      middleware AtomicWeb.AuthMiddleware
      resolve &ProjectManagementResolver.update_project/3
    end

    field :create_task, :task do
      arg :project_id, non_null(:id)
      arg :description, non_null(:string)

      middleware AtomicWeb.AuthMiddleware
      resolve &ProjectManagementResolver.create_task/3
    end

    field :update_task, :task do
      arg :id, non_null(:id)
      arg :description, non_null(:string)

      middleware AtomicWeb.AuthMiddleware
      resolve &ProjectManagementResolver.update_task/3
    end

    field :delete_task, :id do
      arg :id, non_null(:id)

      middleware AtomicWeb.AuthMiddleware
      resolve &ProjectManagementResolver.delete_task/3
    end

    field :start_task, :task do
      arg :task_id, non_null(:id)

      middleware AtomicWeb.AuthMiddleware
      resolve &ProjectManagementResolver.start_task/3
    end

    field :stop_task, :task do
      arg :task_id, non_null(:id)

      middleware AtomicWeb.AuthMiddleware
      resolve &ProjectManagementResolver.stop_task/3
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

    field :request_tasks_report, :boolean do
      arg :project_id, non_null(:id)
      arg :start_date, non_null(:datetime)
      arg :end_date, non_null(:datetime)

      resolve &ReportsResolver.request_tasks_report/3
    end
  end

  subscription do
    field :task_updated, :task do
      config fn _, %{ context: %{ current_user: current_user }} ->
        {:ok, topic: "user:#{current_user.id}"}
      end

      trigger :start_task, topic: fn task ->
        "user:#{task.project.user_id}"
      end

      trigger :stop_task, topic: fn task ->
        "user:#{task.project.user_id}"
      end
    end

    field :report_finished, :report do
      config fn _, %{ context: %{ current_user: current_user }} ->
        {:ok, topic: "user:#{current_user.id}"}
      end
    end
  end
end
