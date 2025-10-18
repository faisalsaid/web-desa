import ContentCard from '../_component/ContentCard';
import CreatedUserForm from './_component/CreatedUserForm';

const UsersPages = () => {
  return (
    <div className="space-y-4">
      <ContentCard className="flex gap-4 items-center justify-between ">
        <h2 className="text-xl font-semibold">All User</h2>
        <CreatedUserForm />
      </ContentCard>

      <div className="bg-primary-foreground p-4 rounded-xl space-y-4">
        <div>{/* <UserFIlterBar /> */}</div>
        {/* <Suspense fallback={<div>Loading...</div>}>
          <UserDataTable<UsersTable, unknown>
            columns={columns}
            data={users}
            currentUser={currentUser}
            pagination={{
              page: pageNumber,
              limit: pageSizeNumber,
              totalPages,
              total,
            }}
          />
        </Suspense> */}
      </div>
      <p className="italic text-xs text-muted-foreground">
        Changing user roles is restricted to admins only.
      </p>
    </div>
  );
};

export default UsersPages;
