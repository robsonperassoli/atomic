defmodule AtomicWeb.Schema do
  use Absinthe.Schema


  alias AtomicWeb.ProjectManagementResolver

  object :project do
    field :id, non_null(:id)
    field :name, non_null(:string)
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
  end
end