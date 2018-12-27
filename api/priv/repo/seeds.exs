# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Atomic.Repo.insert!(%Atomic.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Atomic.Accounts
alias Atomic.ProjectManagement
alias Atomic.Repo

{:ok, user} = Accounts.create_user(%{name: "Robson", email: "robsonme@mydomain.com", password: "123456"})


