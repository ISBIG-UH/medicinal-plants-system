import { DataTable } from 'primereact/datatable';
import { useUserList } from '../hooks/use-user-list';
import { Column } from 'primereact/column';
import UserForm from './user-form';

const Users: React.FC = () => {
    const { loading, users } = useUserList();

    return (
        <div className="flex flex-col h-full items-center py-5 px-2">
            <p className="text-primary font-montserrat font-bold text-2xl lg:text-4xl pb-2">
                Usuarios
            </p>

            <div>
                <DataTable
                    value={users}
                    paginator
                    rows={5}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    tableStyle={{ minWidth: '50rem' }}
                >
                    <Column
                        field="firstName"
                        header="Nombre"
                        style={{ width: '25%' }}
                    ></Column>
                    <Column
                        field="lastName"
                        header="Apellidos"
                        style={{ width: '25%' }}
                    ></Column>
                    <Column
                        field="email"
                        header="Email"
                        style={{ width: '25%' }}
                    ></Column>
                    <Column
                        field="phoneNumber"
                        header="Teléfono"
                        style={{ width: '25%' }}
                    ></Column>
                </DataTable>
            </div>

            <div>
                <UserForm />
            </div>
        </div>
    );
};

export default Users;
