import React from 'react';
import { 
  Server, 
  Trash2, 
  Send, 
  AlertTriangle, 
  ShieldAlert 
} from 'lucide-react';
import { 
  Button, 
  Modal, 
  Input, 
  NumberStepper, 
  Select, 
  Checkbox, 
  useToast 
} from '../../index.js';
import { serviceOptions } from '../data/mockData.js';

/**
 * Dev Sandbox and Playground Modal Dialogs
 * Encapsulates Confirmation prompt and Service Provisioning form dialogs.
 */
export function DevModals({
  isConfirmModalOpen,
  setIsConfirmModalOpen,
  isFormModalOpen,
  setIsFormModalOpen,
  modalNodeName,
  setModalNodeName,
  modalReplicas,
  setModalReplicas,
  modalTier,
  setModalTier,
  modalAutoScaling,
  setModalAutoScaling,
}) {
  const toast = useToast();

  return (
    <>
      {/* Modal 1: Confirmation Prompt Dialog */}
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Reboot Cluster Node?"
        description="This action will terminate 14 active telemetry worker processes."
        icon={ShieldAlert}
        size="md"
        footer={
          <>
            <Button
              variant="ghost"
              onClick={() => setIsConfirmModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              leftIcon={<Trash2 className="w-4 h-4" />}
              onClick={() => {
                setIsConfirmModalOpen(false);
                toast.error('Node Rebooted', 'Cluster node us-east-srv-02 reboot initiated.');
              }}
            >
              Confirm Reboot
            </Button>
          </>
        }
      >
        <div className="bg-accent-red/10 border border-accent-red/30 rounded-xl p-3.5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-accent-red">
            <AlertTriangle className="w-4 h-4" />
            <span>High Impact Operation</span>
          </div>
          <p className="text-[11px] text-brand-10/80 leading-relaxed">
            Targeting node <strong className="font-mono text-brand-10">us-east-srv-02 (Leader)</strong>. Failover will shift traffic to replica pool within 250ms.
          </p>
        </div>
      </Modal>

      {/* Modal 2: Form Configuration Dialog */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title="Deploy New Service Instance"
        description="Configure infrastructure parameters for the deployment."
        icon={Server}
        size="lg"
        footer={
          <>
            <Button
              variant="ghost"
              onClick={() => setIsFormModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              leftIcon={<Send className="w-4 h-4" />}
              onClick={() => {
                setIsFormModalOpen(false);
                toast.success('Instance Provisioned', `Service "${modalNodeName}" with ${modalReplicas} replicas deployed.`);
              }}
            >
              Deploy Service
            </Button>
          </>
        }
      >
        <div className="space-y-4 pt-1">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-brand-10/80">Instance Hostname:</label>
            <Input
              value={modalNodeName}
              onChange={(e) => setModalNodeName(e.target.value)}
              placeholder="e.g. us-east-srv-09"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-brand-10/80">Replicas Count:</label>
              <NumberStepper
                value={modalReplicas}
                onChange={setModalReplicas}
                min={1}
                max={16}
                unit="nodes"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-brand-10/80">Target Region Tier:</label>
              <Select
                value={modalTier}
                onChange={setModalTier}
                options={serviceOptions}
              />
            </div>
          </div>

          <div className="pt-2 border-t border-brand-60/40">
            <Checkbox
              checked={modalAutoScaling}
              onChange={setModalAutoScaling}
              label="Enable Autonomous Autoscaling"
              description="Automatically spin up secondary replicas during spike traffic"
            />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default DevModals;
