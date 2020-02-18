defmodule AtomicWeb.Schema.Mutation.CreateTaskTest do
  use AtomicWeb.ConnCase, async: true

  setup do
    {:ok, user} = create_user()
    {:ok, project} = create_project(%{user: user})

    {:ok, user: user, project: project}
  end

  @query """
  mutation ($projectId: ID!, $description: String!) {
    createTask(projectId: $projectId, description: $description) {
      description
    }
  }
  """

  test "createTask creates a task", %{user: user, project: project} do
    task_description = "New Task - Test"

    variables = %{
      "description" => task_description,
      "projectId" => Integer.to_string(project.id)
    }

    conn = build_conn()
    |> auth_user(user)
    |> post("/graphql", query: @query, variables: variables)

    assert json_response(conn, 200) === %{
      "data" => %{
        "createTask" => %{
          "description" => task_description,
        }
      }
    }
  end

  @query """
  mutation ($projectId: ID!, $description: String!) {
    createTask(projectId: $projectId, description: $description) {
      description
      timerStatus
    }
  }
  """
  test "createTask creates a running task", %{user: user, project: project} do
    task_description = "New Task - Test"
    timer_status = "running"

    variables = %{
      "description" => task_description,
      "projectId" => Integer.to_string(project.id)
    }

    conn = build_conn()
    |> auth_user(user)
    |> post("/graphql", query: @query, variables: variables)

    assert json_response(conn, 200) === %{
      "data" => %{
        "createTask" => %{
          "description" => task_description,
          "timerStatus" => timer_status
        }
      }
    }
  end

  @query """
  mutation ($projectId: ID!, $description: String!, $time: Int!) {
    createTask(projectId: $projectId, description: $description, time: $time) {
      description
      time
    }
  }
  """
  test "createTask creates a task with specified time", %{user: user, project: project} do
    task_description = "New Task - Test"
    time_in_seconds = 3600 #1 minute

    variables = %{
      "description" => task_description,
      "projectId" => Integer.to_string(project.id),
      "time" => time_in_seconds
    }

    conn = build_conn()
    |> auth_user(user)
    |> post("/graphql", query: @query, variables: variables)

    assert json_response(conn, 200) === %{
      "data" => %{
        "createTask" => %{
          "description" => task_description,
          "time" => time_in_seconds
        }
      }
    }
  end
end

