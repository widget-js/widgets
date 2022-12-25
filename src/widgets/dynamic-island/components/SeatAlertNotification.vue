<template>
  <div class="seat-alert-notification">
    <div class="info">
      <div class="icon mgc_sofa_line">
        <img
            src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDUiIGhlaWdodD0iNDUiIHZpZXdCb3g9IjAgMCA0NSA0NSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xOC43NSA1LjYyNUMxMy41NzIzIDUuNjI1IDkuMzc1IDkuODIyMzQgOS4zNzUgMTVWMTcuMTk1MUM3LjE5MDI3IDE3Ljk2NzMgNS42MjUgMjAuMDUwOSA1LjYyNSAyMi41VjMxLjg3NUM1LjYyNSAzMy45NDYxIDcuMzAzOTMgMzUuNjI1IDkuMzc1IDM1LjYyNVYzNy41QzkuMzc1IDM4LjUzNTYgMTAuMjE0NSAzOS4zNzUgMTEuMjUgMzkuMzc1QzEyLjI4NTUgMzkuMzc1IDEzLjEyNSAzOC41MzU2IDEzLjEyNSAzNy41VjM1LjYyNUgzMS44NzVWMzcuNUMzMS44NzUgMzguNTM1NiAzMi43MTQ0IDM5LjM3NSAzMy43NSAzOS4zNzVDMzQuNzg1NiAzOS4zNzUgMzUuNjI1IDM4LjUzNTYgMzUuNjI1IDM3LjVWMzUuNjI1QzM3LjY5NjEgMzUuNjI1IDM5LjM3NSAzMy45NDYxIDM5LjM3NSAzMS44NzVWMjIuNUMzOS4zNzUgMjAuMDUwOSAzNy44MDk3IDE3Ljk2NzMgMzUuNjI1IDE3LjE5NTFWMTVDMzUuNjI1IDkuODIyMzQgMzEuNDI3NiA1LjYyNSAyNi4yNSA1LjYyNUgxOC43NVpNMzEuODc1IDE3LjE5NTFWMTVDMzEuODc1IDExLjg5MzQgMjkuMzU2NyA5LjM3NSAyNi4yNSA5LjM3NUgxOC43NUMxNS42NDM0IDkuMzc1IDEzLjEyNSAxMS44OTM0IDEzLjEyNSAxNVYxNy4xOTUxQzE1LjMwOTcgMTcuOTY3MyAxNi44NzUgMjAuMDUwOSAxNi44NzUgMjIuNVYyNC4zNzVIMjguMTI1VjIyLjVDMjguMTI1IDIwLjA1MDkgMjkuNjkwMyAxNy45NjczIDMxLjg3NSAxNy4xOTUxWk05LjM3NSAyMi41QzkuMzc1IDIxLjQ2NDQgMTAuMjE0NSAyMC42MjUgMTEuMjUgMjAuNjI1QzEyLjI4NTUgMjAuNjI1IDEzLjEyNSAyMS40NjQ0IDEzLjEyNSAyMi41VjI2LjI1QzEzLjEyNSAyNy4yODU2IDEzLjk2NDUgMjguMTI1IDE1IDI4LjEyNUgzMEMzMS4wMzU2IDI4LjEyNSAzMS44NzUgMjcuMjg1NiAzMS44NzUgMjYuMjVWMjIuNUMzMS44NzUgMjEuNDY0NCAzMi43MTQ0IDIwLjYyNSAzMy43NSAyMC42MjVDMzQuNzg1NiAyMC42MjUgMzUuNjI1IDIxLjQ2NDQgMzUuNjI1IDIyLjVWMzEuODc1SDkuMzc1VjIyLjVaIiBmaWxsPSIjNUQ4QUM4Ii8+Cjwvc3ZnPgo='/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SeatAlertNotification"
}
</script>

<style scoped>
.seat-alert-notification {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 11px 16px 18px;
  isolation: isolate;

  width: 367px;
  height: 149px;

  background: #000000;
  /* ExpandedIsland */

  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.25);
  border-radius: 42px;

  /* Inside auto layout */

  flex: none;
  order: 2;
  flex-grow: 0;
}
</style>
