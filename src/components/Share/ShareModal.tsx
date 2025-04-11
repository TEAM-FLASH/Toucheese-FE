import Modal from '@components/Modal/Modal';
import ShareOptions from './ShareOptions';
import { ShareProps } from './ShareButton';

const ShareModal = ({ title, description, imageUrl, webUrl }: ShareProps) => {
  return (
    <Modal type="fullscreen" title="공유 옵션 선택" withBtn={false} isCloseBtn={true}>
      <ShareOptions title={title} description={description} imageUrl={imageUrl} webUrl={webUrl} />
    </Modal>
  );
};

export default ShareModal;
