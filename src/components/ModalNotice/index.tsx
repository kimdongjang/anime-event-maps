import { setLocalstorageNotice } from '@/utils/localStorages';
import { Modal } from 'antd';
import { Dispatch, SetStateAction } from 'react';

interface IModalNotice {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const ModalNotice = (props: IModalNotice) => {
  const { modalOpen, setModalOpen } = props;
  return (
    <Modal
      title="공지사항"
      centered
      open={modalOpen}
      onOk={() => {
        setLocalstorageNotice();
        setModalOpen(false);
      }}
      onCancel={() => {
        setLocalstorageNotice();
        setModalOpen(false);
      }}
      okButtonProps={{
        className: 'bg-blue-500',
        content: '확인',
      }}
    >
      <div className="flex flex-col">
        <p>
          애이맵(애니메이션 행사 맵스)은 애니메이션/게임 오프라인 행사 정보들을
          모아서 사용자에게 제공하는 사이트입니다.
        </p>
        <p>
          수동으로 데이터를 입력하는 것이기에 맞지 않는 정보가 있을 수도
          있습니다.
        </p>
        <h4 className="font-semibold pt-3">현재버전 v1.1.0</h4>
        <ul className="px-3">
          <li>네이버 지도를 leaflet 지도로 업데이트 완료</li>
          <li>북마크 기능</li>
          <li>필터 기능</li>
          <li>캘린더 기능</li>
          <li>리스트 크게 보기 / 리스트 작게 보기 기능</li>
        </ul>
        <h4 className="font-semibold pt-3">업데이트예정</h4>
        <ul className="px-3">
          <li>내 위치 확인 기능</li>
          <li>상위 핀 기능</li>
        </ul>
        <p className="pt-3">
          건의사항은 자유롭게
          <a href="mailto:gieunp3644@gmail.com" className="ml-1">
            gieunp3644@gmail.com
          </a>
          혹은 트위터 @gieunp로 연락주시면 감사하겠습니다.
        </p>
      </div>
    </Modal>
  );
};
