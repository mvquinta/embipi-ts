import type { NextPage } from 'next';
import { UserProfile, UserChildren } from 'types/types';
import { useState, useEffect } from 'react';
import { Loader, ModalDelete, FormSettings, DeleteAccount } from '@/components/index';

type Props = {
    user: UserProfile;
    child: UserChildren;
};

export const PrivateSettings: NextPage<Props> = ({ user, child }) => {
    const [loading, setLoading] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, [child, user]);

    const handleOpenDeleteModal = () => {
        setOpenDeleteModal(!openDeleteModal);
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-9">
                    <div className="pb-5 border-b border-gray-200">
                        <h3 className="ml-2 mt-2 text-lg leading-6 font-medium text-gray-900">
                            Settings
                        </h3>
                        <p className="ml-2 mt-1 text-sm text-gray-500 truncate">
                            Manage and edit your personal and child information, delete account.
                        </p>
                    </div>
                    <div className="space-y-6">
                        <FormSettings
                            user={user}
                            child={child}
                            loading={loading}
                            setLoading={setLoading}
                        />
                        <DeleteAccount handleOpenDeleteModal={handleOpenDeleteModal} />
                    </div>
                </div>
            )}

            {openDeleteModal ? (
                <ModalDelete
                    modalTexts={{
                        button: 'Delete',
                        message: 'Are you sure? This action cannot be undone.',
                    }}
                    openDeleteModal={openDeleteModal}
                    setOpenDeleteModal={setOpenDeleteModal}
                />
            ) : null}
        </>
    );
};
