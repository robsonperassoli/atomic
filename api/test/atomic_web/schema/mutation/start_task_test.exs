defmodule AtomicWeb.Schema.Mutation.StartTaskTest do
  use AtomicWeb.ConnCase, async: true
  alias Atomic.ProjectManagement

  setup do
    {:ok, user} = create_user()
    {:ok, project} = create_project(%{user: user})
    {:ok, task} = create_task(%{user: user, project: project})

    ProjectManagement.stop_task(task.id, user)

    {:ok, user: user, task: task}
  end

  @query """
  mutation ($taskId: ID!) {
    startTask(taskId: $taskId) {
      timerStatus
    }
  }
  """

  test "startTask changes the timer status to running", %{user: user, task: task} do
    conn = build_conn()
    |> auth_user(user)
    |> post("/graphql", query: @query, variables: %{"taskId" => Integer.to_string(task.id)})

    assert json_response(conn, 200) === %{
      "data" => %{
        "startTask" => %{
          "timerStatus" => "running",
        }
      }
    }
  end
end

