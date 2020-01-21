defmodule AtomicWeb.ApiContext do
  @behaviour Plug

  import Plug.Conn

  alias AtomicWeb.AuthHelper

  def init(opts), do: opts

  def call(conn, _) do
    case build_context(conn) do
      {:ok, current_user} ->
        put_private(conn, :current_user, current_user)
      _ ->
        conn
    end
  end

  defp build_context(conn) do
    with ["Bearer " <> token] <- get_req_header(conn, "authorization"),
         {:ok, current_user} <- authorize(token) do
      {:ok, current_user}
    end
  end

  defp authorize(token) do
    case AuthHelper.get_user_by_token(token) do
      {:ok, user} ->
        {:ok, user}
      _ ->
        {:error, "Invalid authorization token"}
    end
  end
end
