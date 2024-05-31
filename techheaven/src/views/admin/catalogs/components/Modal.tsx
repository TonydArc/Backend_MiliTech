import React, { useState, useRef, useEffect, SetStateAction } from "react";
import { createCatalogs, getCatalogs } from "services/adminService";

interface ModalProps {
    onAddCatalog: () => void;
}

const Modal: React.FC<ModalProps> = ({onAddCatalog}) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const [CatalogName, setCatalogsName] = useState('');
    const [Description, setCatalogsDes] = useState('');


    // const navigate = useNavigate();

    const formdata = {
        CatalogName,
        Description,
    };


    const handleChangeName = (event: { target: { value: SetStateAction<string>; }; }) => {
        setCatalogsName(event.target.value);
    };
    const handleChangeDes = (event: { target: { value: SetStateAction<string>; }; }) => {
        setCatalogsDes(event.target.value);
    };


    const handleClick = async () => {

        formdata.CatalogName = CatalogName;
        formdata.Description = Description;
        try {
            await createCatalogs(formdata);
            onAddCatalog();
            alert('Create new catalog successfully!')
            return hideModal();
        } catch (error) {
            alert('Catalogs error ' + error);
        }
    };


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                hideModal();
            }
        };

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showModal]);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const hideModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <button
                data-modal-target="popup-modal"
                data-modal-toggle="popup-modal"
                className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
                type="button"
                onClick={toggleModal}
            >
                Add  Catalog
            </button>

            {showModal && (
                <div
                    id="popup-modal"
                    className="overflow-y-auto overflow-x-hidden fixed z-50 inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50"
                >
                    <div ref={modalRef} className="relative w-full max-w-md p-4">
                        <div className="bg-gray-100 rounded-lg shadow dark:bg-gray-700">
                            <div className="p-4 md:p-5 text-center">
                                <div className="my-6">
                                    <div className="relative">
                                        <input value={CatalogName} onChange={handleChangeName} type="text" id="floating_outlined1" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border-1 border-blueSecondary appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                        <label htmlFor="floating_outlined1" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-80 top-3 z-10 origin-[0] bg-transparent dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">CatalogName</label>
                                    </div>
                                    <div className="relative mt-4">
                                        <input value={Description} onChange={handleChangeDes} type="text" id="floating_outlined2" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-whiterounded-lg border-1 border-blueSecondary appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                        <label htmlFor="floating_outlined2" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-80 top-3 z-10 origin-[0] bg-transparent  dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Description</label>
                                    </div>
                                </div>
                                <button
                                    data-modal-hide="popup-modal"
                                    type="button"
                                    className="text-white justify-center mx-4 w-32focus:outline-none bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                    onClick={hideModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    data-modal-hide="popup-modal"
                                    type="button"
                                    className="text-white justify-center mx-4 w-32 focus:outline-none bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
                                    onClick={handleClick}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal;
