import { X } from "lucide-react";

interface DialogProps {
  handleClose: () => void;
}
const ModalUi = ({ handleClose }: DialogProps) => {
  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[4px]"
        onClick={handleClose}
      >
        <div
          className="w-full max-w-[400px] rounded-lg border border-border bg-surface overflow-hidden shadow-md"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-fg text-base font-medium hover:cursor-default">
                Edit Profile
              </h2>

              <button
                className="text-fg-muted hover:text-fg transition-all"
                onClick={handleClose}
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-xs text-fg-muted mt-2 hover:cursor-default">
              Make changes to your profile here. Click save when you're done.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="text-fg text-xs font-medium block mb-2">
                  Name
                </label>

                <input
                  placeholder="Pedro Duarte"
                  type="text"
                  className="w-full border border-border rounded-md px-3 py-2 text-sm text-fg bg-canvas outline-none focus:border-border-strong transition-colors"
                />
              </div>

              <div>
                <label className="text-fg text-xs font-medium block mb-2">
                  Username
                </label>

                <input
                  placeholder="PedroDuarte@69.com"
                  type="text"
                  className="w-full border border-border rounded-md px-3 py-2 text-sm text-fg bg-canvas outline-none focus:border-border-strong transition-colors"
                />
              </div>
            </div>
          </div>

          <hr className="border-border" />

          <div className="flex justify-end gap-2 p-4 bg-subtle">
            <button
              className="rounded-md py-2 px-4 text-fg border border-border text-xs font-medium bg-surface hover:bg-subtle transition-all"
              onClick={handleClose}
            >
              Cancel
            </button>

            <button className="rounded-md py-2 px-4 text-fg-inverse text-xs font-medium bg-primary hover:bg-primary-hover transition-all">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalUi;
